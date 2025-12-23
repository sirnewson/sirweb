import { motion, AnimatePresence } from 'framer-motion';

interface ImageModalProps {
    isOpen: boolean;
    onClose: () => void;
    imageSrc: string;
    title: string;
}

const ImageModal = ({ isOpen, onClose, imageSrc, title }: ImageModalProps) => {
    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = imageSrc;
        link.download = `${title.replace(/\s+/g, '-').toLowerCase()}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
                    >
                        <button
                            onClick={onClose}
                            className="absolute -top-12 right-0 text-white/50 hover:text-white transition-colors"
                        >
                            <i className="fas fa-times text-2xl"></i>
                        </button>

                        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 w-full h-full">
                            <img
                                src={imageSrc}
                                alt={title}
                                className="w-full h-full object-contain max-h-[80vh] bg-black"
                            />
                        </div>

                        <div className="mt-6 flex items-center gap-4">
                            <h3 className="text-white font-display text-xl font-bold">{title}</h3>
                            <div className="h-1 w-1 bg-white/30 rounded-full" />
                            <button
                                onClick={handleDownload}
                                className="px-6 py-2 bg-primary text-black rounded-full font-bold text-sm hover:bg-white transition-colors shadow-[0_0_20px_rgba(191,255,0,0.3)] flex items-center gap-2"
                            >
                                <i className="fas fa-download"></i> Download
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ImageModal;
