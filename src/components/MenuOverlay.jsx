import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const MenuOverlay = ({ isOpen, onClose }) => {
  const navigate = useNavigate()

  const menuItems = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT', path: '/about' },
    { name: 'WORK', path: '/experience' },
    { name: 'TECHNOLOGIES', path: '/technologies' },
    { name: 'BLOG', path: '/blogs' },
    { name: 'CONTACT', path: '/contact' },
  ]

  const handleNavigation = (path) => {
    navigate(path)
    onClose()
  }

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.3 }
    }
  }

  const menuVariants = {
    hidden: { x: '100%' },
    visible: { 
      x: 0,
      transition: { 
        type: 'tween',
        duration: 0.4,
        ease: 'easeInOut'
      }
    },
    exit: { 
      x: '100%',
      transition: { 
        type: 'tween',
        duration: 0.4,
        ease: 'easeInOut'
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.1 + i * 0.1,
        duration: 0.3
      }
    })
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Menu Panel */}
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 right-0 h-full w-full bg-black z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-white/10">
              <div className="text-2xl font-light text-white">
                Elisha.
              </div>
              <button
                onClick={onClose}
                className="text-white hover:text-gray-300 transition-colors text-sm font-medium"
              >
                CLOSE ✕
              </button>
            </div>

            {/* Menu Items */}
            <div className="flex-1 flex flex-col justify-center items-center space-y-8">
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  custom={index}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  onClick={() => handleNavigation(item.path)}
                  className="text-white text-2xl font-light hover:text-gray-300 transition-colors duration-300 tracking-wider"
                >
                  {item.name}
                </motion.button>
              ))}
            </div>

            {/* Footer */}
            <div className="p-6 text-center">
              <p className="text-gray-500 text-sm">
                © Elisha Theetla, All rights reserved
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default MenuOverlay
