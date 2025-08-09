export const opacity = {
    initial: { opacity: 0 },
    enter: { opacity: 0.9, transition: { duration: 1, delay: 0.2 } },
}
export const slideUp = {
  initial: { top: 0, opacity: 1 },
  exit: { top: "-100vh", opacity: 0, transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }
}