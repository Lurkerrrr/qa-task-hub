import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import Dashboard from './Dashboard';
import BugTracker from './BugTracker';
import ExternalAPI from './ExternalAPI';

const AnimatedRoutes = ({ bugs, setBugs, t }) => {
    const location = useLocation();

    const order = {
        '/': 1,
        '/tracker': 2,
        '/api': 3,
    };

    const pageIndex = order[location.pathname] || 0;
    const prevIndex = React.useRef(pageIndex);

    const direction = pageIndex > prevIndex.current ? 1 : -1;

    React.useEffect(() => {
        prevIndex.current = pageIndex;
    }, [pageIndex]);

    const variants = {
        initial: (direction) => ({
            opacity: 0,
            x: direction > 0 ? 100 : -100,
        }),
        enter: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.4, ease: 'easeOut' },
        },
        exit: (direction) => ({
            opacity: 0,
            x: direction > 0 ? -100 : 100,
            transition: { duration: 0.3, ease: 'easeIn' },
        }),
    };

    return (
        <AnimatePresence mode="wait" custom={direction}>
            <Routes location={location} key={location.pathname}>
                <Route
                    path="/"
                    element={
                        <PageWrapper custom={direction} variants={variants}>
                            <Dashboard bugs={bugs} t={t} />
                        </PageWrapper>
                    }
                />

                <Route
                    path="/tracker"
                    element={
                        <PageWrapper custom={direction} variants={variants}>
                            <BugTracker bugs={bugs} setBugs={setBugs} t={t} />
                        </PageWrapper>
                    }
                />

                <Route
                    path="/api"
                    element={
                        <PageWrapper custom={direction} variants={variants}>
                            <ExternalAPI t={t} />
                        </PageWrapper>
                    }
                />
            </Routes>
        </AnimatePresence>
    );
};

const PageWrapper = ({ children, custom, variants }) => {
    return (
        <motion.div
            custom={custom}
            variants={variants}
            initial="initial"
            animate="enter"
            exit="exit"
            className="w-full h-full"
        >
            {children}
        </motion.div>
    );
};

export default AnimatedRoutes;
