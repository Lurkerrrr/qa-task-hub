import React, { useRef, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { IBug } from '../types/interfaces';
import { TranslationSchema } from '../locales/translations';

import Dashboard from './Dashboard';
import BugTracker from './BugTracker';
import ExternalAPI from './ExternalAPI';

interface AnimatedRoutesProps {
    bugs: IBug[];
    setBugs: React.Dispatch<React.SetStateAction<IBug[]>>;
    onAddBug: (bug: Omit<IBug, 'id'>) => Promise<void>;
    onDeleteBug: (id: number) => Promise<void>;
    onUpdateStatus: (id: number, status: string) => Promise<void>;
    t: TranslationSchema; // Тепер суворий тип!
}

const AnimatedRoutes: React.FC<AnimatedRoutesProps> = ({
    bugs,
    onAddBug,
    onDeleteBug,
    onUpdateStatus,
    t
}) => {
    const location = useLocation();

    // Скрол вгору тільки при зміні сторінки
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    const order: Record<string, number> = { '/': 1, '/tracker': 2, '/api': 3 };
    const pageIndex = order[location.pathname] || 0;
    const prevIndex = useRef<number>(pageIndex);
    const direction = pageIndex > prevIndex.current ? 1 : -1;

    useEffect(() => {
        prevIndex.current = pageIndex;
    }, [pageIndex]);

    const variants = {
        initial: (dir: number) => ({ opacity: 0, x: dir > 0 ? 50 : -50 }),
        enter: { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeOut' } },
        exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -50 : 50, transition: { duration: 0.2 } }),
    };

    return (
        <AnimatePresence mode="wait" custom={direction}>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={
                    <PageWrapper custom={direction} variants={variants}>
                        <Dashboard bugs={bugs} t={t} />
                    </PageWrapper>
                } />
                <Route path="/tracker" element={
                    <PageWrapper custom={direction} variants={variants}>
                        <BugTracker
                            bugs={bugs}
                            t={t}
                            onAddBug={onAddBug}
                            onDeleteBug={onDeleteBug}
                            onUpdateStatus={onUpdateStatus}
                        />
                    </PageWrapper>
                } />
                <Route path="/api" element={
                    <PageWrapper custom={direction} variants={variants}>
                        <ExternalAPI t={t} />
                    </PageWrapper>
                } />
            </Routes>
        </AnimatePresence>
    );
};

const PageWrapper: React.FC<{ children: React.ReactNode; custom: number; variants: any }> = ({ children, custom, variants }) => (
    <motion.div
        custom={custom}
        variants={variants}
        initial="initial"
        animate="enter"
        exit="exit"
        className="w-full min-h-[60vh]" // ВИДАЛИЛИ h-full, залишили тільки мінімальну висоту
    >
        {children}
    </motion.div>
);

export default AnimatedRoutes;