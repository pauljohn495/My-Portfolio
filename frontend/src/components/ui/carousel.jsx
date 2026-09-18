import * as React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const CarouselContext = React.createContext(null)
const cn = (...classes) => classes.filter(Boolean).join(' ')

function useCarousel() {
  const context = React.useContext(CarouselContext)
  if (!context) throw new Error('Carousel components must be used within <Carousel />')
  return context
}

const Carousel = React.forwardRef(({
  orientation = 'horizontal',
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}, ref) => {
  const [carouselRef, api] = useEmblaCarousel({ ...opts, axis: orientation === 'horizontal' ? 'x' : 'y' }, plugins)
  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(false)

  const updateNavigation = React.useCallback((currentApi) => {
    if (!currentApi) return
    setCanScrollPrev(currentApi.canScrollPrev())
    setCanScrollNext(currentApi.canScrollNext())
  }, [])

  const scrollPrev = React.useCallback(() => api?.scrollPrev(), [api])
  const scrollNext = React.useCallback(() => api?.scrollNext(), [api])

  const handleKeyDownCapture = React.useCallback((event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      scrollPrev()
    } else if (event.key === 'ArrowRight') {
      event.preventDefault()
      scrollNext()
    }
  }, [scrollPrev, scrollNext])

  React.useEffect(() => {
    if (!api || !setApi) return
    setApi(api)
  }, [api, setApi])

  React.useEffect(() => {
    if (!api) return undefined
    api.on('reInit', updateNavigation)
    api.on('select', updateNavigation)
    const initialUpdate = window.requestAnimationFrame(() => updateNavigation(api))
    return () => {
      window.cancelAnimationFrame(initialUpdate)
      api.off('reInit', updateNavigation)
      api.off('select', updateNavigation)
    }
  }, [api, updateNavigation])

  return (
    <CarouselContext.Provider value={{ carouselRef, api, orientation, scrollPrev, scrollNext, canScrollPrev, canScrollNext }}>
      <div ref={ref} onKeyDownCapture={handleKeyDownCapture} className={cn('shadcn-carousel', className)} role="region" aria-roledescription="carousel" {...props}>
        {children}
      </div>
    </CarouselContext.Provider>
  )
})
Carousel.displayName = 'Carousel'

const CarouselContent = React.forwardRef(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel()
  return (
    <div ref={carouselRef} className="shadcn-carousel-viewport">
      <div ref={ref} className={cn('shadcn-carousel-content', orientation === 'vertical' && 'is-vertical', className)} {...props} />
    </div>
  )
})
CarouselContent.displayName = 'CarouselContent'

const CarouselItem = React.forwardRef(({ className, ...props }, ref) => {
  const { orientation } = useCarousel()
  return (
    <div ref={ref} role="group" aria-roledescription="slide" className={cn('shadcn-carousel-item', orientation === 'vertical' && 'is-vertical', className)} {...props} />
  )
})
CarouselItem.displayName = 'CarouselItem'

const CarouselPrevious = React.forwardRef(({ className, ...props }, ref) => {
  const { scrollPrev, canScrollPrev } = useCarousel()
  return (
    <button ref={ref} type="button" className={cn('shadcn-carousel-previous', className)} disabled={!canScrollPrev} onClick={scrollPrev} aria-label="Previous project" {...props}>
      <ArrowLeft aria-hidden="true" /><span className="sr-only">Previous slide</span>
    </button>
  )
})
CarouselPrevious.displayName = 'CarouselPrevious'

const CarouselNext = React.forwardRef(({ className, ...props }, ref) => {
  const { scrollNext, canScrollNext } = useCarousel()
  return (
    <button ref={ref} type="button" className={cn('shadcn-carousel-next', className)} disabled={!canScrollNext} onClick={scrollNext} aria-label="Next project" {...props}>
      <ArrowRight aria-hidden="true" /><span className="sr-only">Next slide</span>
    </button>
  )
})
CarouselNext.displayName = 'CarouselNext'

export { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext }
