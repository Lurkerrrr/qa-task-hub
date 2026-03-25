## [1.2.1](https://github.com/Lurkerrrr/qa-task-hub/compare/v1.2.0...v1.2.1) (2026-03-25)


### Bug Fixes

* **ci:** remove duplicate 'on' key and set write permissions ([#10](https://github.com/Lurkerrrr/qa-task-hub/issues/10)) ([38dc600](https://github.com/Lurkerrrr/qa-task-hub/commit/38dc60009d6732ccb0e9a3b938d119468577639d))

# [1.2.0](https://github.com/Lurkerrrr/qa-task-hub/compare/v1.1.0...v1.2.0) (2026-03-14)


### Features

* implement global state with React Query and Zod validation ([#7](https://github.com/Lurkerrrr/qa-task-hub/issues/7)) ([586ed84](https://github.com/Lurkerrrr/qa-task-hub/commit/586ed8461e9d21da42e019a23928942ea56adad5))

# [1.1.0](https://github.com/Lurkerrrr/qa-task-hub/compare/v1.0.0...v1.1.0) (2026-03-09)


### Features

* secure auth and httpOnly cookies ([#5](https://github.com/Lurkerrrr/qa-task-hub/issues/5)) ([fbd228b](https://github.com/Lurkerrrr/qa-task-hub/commit/fbd228bd550258a1014c5569e2578fcf7a6d816c))

# 1.0.0 (2026-03-07)


### Bug Fixes

* add missing validationMiddleware import in authRoutes ([c9814c4](https://github.com/Lurkerrrr/qa-task-hub/commit/c9814c4daaa95002f2669121b45116273dcd3fe6))
* align bug validation schema, restore tracker modal design with portals, and polish dashboard UI ([6862411](https://github.com/Lurkerrrr/qa-task-hub/commit/68624113ba543f0a78db9b9ac41782ea65cef2e5))
* allow unknown fields in Joi to resolve login bug ([0402c01](https://github.com/Lurkerrrr/qa-task-hub/commit/0402c011c871c7b5dd3710b880790a83e6185142))
* correct allure results path for newman reporter ([a0b2dbc](https://github.com/Lurkerrrr/qa-task-hub/commit/a0b2dbceff48f3078e351af07860dfeea537b0cb))
* correct userId extraction in BugController to match AuthGuard payload ([5760073](https://github.com/Lurkerrrr/qa-task-hub/commit/57600736a54de527151ae40144c8d7b329b7bf47))
* dashboard metric color ([615c7f0](https://github.com/Lurkerrrr/qa-task-hub/commit/615c7f02c728d0cabec580ca20abe70f04aa6d42))
* disable autofill on Auth form to prevent UX issues ([81f9ade](https://github.com/Lurkerrrr/qa-task-hub/commit/81f9adec1bdea8e790571b661621b476ba246b68))
* ensure frontend sends correct username in bug creation payload ([9d7716d](https://github.com/Lurkerrrr/qa-task-hub/commit/9d7716d7ad3cd5bc1cac37494edd829b3f1329a2))
* extract and bind userRole from JWT in AuthGuard ([90be52a](https://github.com/Lurkerrrr/qa-task-hub/commit/90be52a47538a08536ba4643f18ff2f943d1c247))
* handle 403 Forbidden UI state gracefully on dashboard ([b0e7e39](https://github.com/Lurkerrrr/qa-task-hub/commit/b0e7e39dd514ee4f65a4a734b8ac416e19125553))
* inject user role into JWT payload for security policies ([b674465](https://github.com/Lurkerrrr/qa-task-hub/commit/b67446592dfa63b9847e641a047769c27d7d2110))
* minor project improvements ([9b8f1d0](https://github.com/Lurkerrrr/qa-task-hub/commit/9b8f1d0fa9b87fc9466ef0c2137d7803cc740eea))
* removed branding from tracker titles ([82c99b3](https://github.com/Lurkerrrr/qa-task-hub/commit/82c99b35cf49e51de9497d6f5ef7dcc1ac08b575))
* removed duplicate icons in priority, fixed button label, and added form reset on close ([e353188](https://github.com/Lurkerrrr/qa-task-hub/commit/e3531880fe88188eec3fd6787036418d6c8cee91))
* removed required validation for bug reproduction steps ([326babc](https://github.com/Lurkerrrr/qa-task-hub/commit/326babcd3c443375f2663085833c83bfc7dae809))
* resolve auth and dashboard UI bugs ([374c180](https://github.com/Lurkerrrr/qa-task-hub/commit/374c1805184a4e9864b770497501df234910b300))
* resolve sqlite initialization race condition in ci environment ([12ea8da](https://github.com/Lurkerrrr/qa-task-hub/commit/12ea8da81afa497fe461ecce938214cbee372672))
* resolve useEffect dependency warning in ExternalAPI ([80e5de5](https://github.com/Lurkerrrr/qa-task-hub/commit/80e5de54d70ac5ff876f3672606691f3d5a1794d))
* resolved modal z-index issues using React Portal and updated translations ([c557efa](https://github.com/Lurkerrrr/qa-task-hub/commit/c557efa5c793c2da232cae1ac16e99d34e64be13))
* synchronize JWT auth, migrate to TypeScript ([98c426d](https://github.com/Lurkerrrr/qa-task-hub/commit/98c426d9377e93155492ee86176a75cb24cc6e01))
* update bug routes and fix middleware import paths ([ccde83d](https://github.com/Lurkerrrr/qa-task-hub/commit/ccde83dddb0f8eeca933a778c7faa7e5c08f864a))
* update data parsing to support new OOP response contracts ([71c4107](https://github.com/Lurkerrrr/qa-task-hub/commit/71c4107b48cc4559384bdf6d4032a87c4949d632))
* update English flag to GB in Header component ([280fb82](https://github.com/Lurkerrrr/qa-task-hub/commit/280fb82d0711009ab7a6ae85502f4719f6b3f5a7))
* updated footer text, standardized dashboard colors and localized risk metrics ([d154fe1](https://github.com/Lurkerrrr/qa-task-hub/commit/d154fe1825ede8b6eb6516c4e45034f52e3a4f08))


### Features

* add explicit JsonWebTokenError signature handling ([aea9f29](https://github.com/Lurkerrrr/qa-task-hub/commit/aea9f293ca5ad6f6a5564200f9163973941ea22e))
* add explicit TokenExpiredError handling ([c1e64fc](https://github.com/Lurkerrrr/qa-task-hub/commit/c1e64fcb300bea0b9cd6b34329e3bf3ca2cc0ae9))
* add SQLite backend and fix routing ([3af346e](https://github.com/Lurkerrrr/qa-task-hub/commit/3af346e08c999f24c78adb43a240f87e6c233ad6))
* added activity feed and health metrics to dashboard ([177cacc](https://github.com/Lurkerrrr/qa-task-hub/commit/177cacc633d0373c9c3088855fae7276109f7961))
* added custom language selector with SVG flags ([13ee609](https://github.com/Lurkerrrr/qa-task-hub/commit/13ee6091b97707fccf75cf2408d581a1a7285ae5))
* added data charts to dashboard ([b14cfcd](https://github.com/Lurkerrrr/qa-task-hub/commit/b14cfcd9abae7e814fbf898d4a10945693dbd4bb))
* added security alert and auto-logout on 403 errors ([1dd048c](https://github.com/Lurkerrrr/qa-task-hub/commit/1dd048ccd53a1254c250c483bf413effebbc1d2e))
* added sticky header and smooth scroll-to-top button ([1248c08](https://github.com/Lurkerrrr/qa-task-hub/commit/1248c08b81c2870e0611c20a8d4ebbbd6881d650))
* adding user identifier into JWT payload on login ([7e4da40](https://github.com/Lurkerrrr/qa-task-hub/commit/7e4da40310dc63db9724a3e82999aa673cf22542))
* advanced api explorer, multi-language support (i18n) and ux improvements ([0f402e0](https://github.com/Lurkerrrr/qa-task-hub/commit/0f402e0cbb19e80d88e828f65223f7d303c6b77f))
* apply Joi validation middleware to auth and bug routes ([bd44718](https://github.com/Lurkerrrr/qa-task-hub/commit/bd44718fd09b2864e557d941e5b630b3923a4ff0))
* compare bug DB assignee with JWT username ([6f061ad](https://github.com/Lurkerrrr/qa-task-hub/commit/6f061ad73e14c53eaa203943154f887f6d238c36))
* configure and enforce helmet custom headers in server.ts ([a3837a4](https://github.com/Lurkerrrr/qa-task-hub/commit/a3837a4210e525c6a842b2882feecaa9f11c8774))
* configure standard rate limiter for register endpoint ([431a9b7](https://github.com/Lurkerrrr/qa-task-hub/commit/431a9b783581f794d41eadec3fe762162e02254a))
* configure strict rate limiter for login endpoint ([ce18923](https://github.com/Lurkerrrr/qa-task-hub/commit/ce189235e5b9b6e70571ffbd131c492ca774b6d3))
* create custom AppError class for operational errors ([3a9e195](https://github.com/Lurkerrrr/qa-task-hub/commit/3a9e1954461c87e333e591d45c8809d139123051))
* create ForbiddenError class ([8927304](https://github.com/Lurkerrrr/qa-task-hub/commit/892730468fb8aecf8a1cd07d16b06b2c78324746))
* create global error handler ([1dbc155](https://github.com/Lurkerrrr/qa-task-hub/commit/1dbc15529f80f046cbfefa7cc3e7a82d649ba234))
* create Joi validation schemas and middleware ([05f711e](https://github.com/Lurkerrrr/qa-task-hub/commit/05f711ea912b79a3246e91f5b2584ce26cf86e4c))
* create NotFoundError class ([e070f83](https://github.com/Lurkerrrr/qa-task-hub/commit/e070f83fac4afc8e95fffbca4f9b05cc0addd7a3))
* create UnauthorizedError class ([7e4749f](https://github.com/Lurkerrrr/qa-task-hub/commit/7e4749ff44afbab497bc1d096d07137c8714ddbb))
* dashboard and tailwind added ([842132b](https://github.com/Lurkerrrr/qa-task-hub/commit/842132b73784a5543ff2b46c05c55042fc146f75))
* dashboard for tracker data ([8820401](https://github.com/Lurkerrrr/qa-task-hub/commit/88204018403970c20ef05681e2068cadb59030a0))
* define strict generic and specific response interfaces ([e1189cc](https://github.com/Lurkerrrr/qa-task-hub/commit/e1189cc268d4f580ab94f03881cb552ea772394e))
* enhanced API Explorer with dynamic endpoints and full URL display ([9dbbf59](https://github.com/Lurkerrrr/qa-task-hub/commit/9dbbf59333b128dd2ba4a04b7d7bdb12b8fcf580))
* extract bug ID from request params in verifyBugOwnership ([2011225](https://github.com/Lurkerrrr/qa-task-hub/commit/20112252c93f6d65a9b5023efc746d7bb2ea2d5b))
* extract username from JWT and attach to AuthRequest ([0d5e114](https://github.com/Lurkerrrr/qa-task-hub/commit/0d5e11472a54a02ae67c442d3857941291dfc646))
* fetch target bug from database in verifyBugOwnership ([3075cdf](https://github.com/Lurkerrrr/qa-task-hub/commit/3075cdfa34444f7a2e4f1af3d10d89d45c61812f))
* fix dashboard emoji duplication, center chart labels, and cleanup code ([a40d46c](https://github.com/Lurkerrrr/qa-task-hub/commit/a40d46c1ae6fd9a804c995932091b544d6e2e529))
* implement 403 Forbidden response for DB ownership mismatch ([5ec6e88](https://github.com/Lurkerrrr/qa-task-hub/commit/5ec6e88c8b8873262a0ddeb2a99073b448674106))
* implement 403 Forbidden response for ownership mismatch ([6fcde53](https://github.com/Lurkerrrr/qa-task-hub/commit/6fcde536c416fe50dfa2855a252a7798b24ab8b8))
* implement Admin role bypass for ownership restrictions ([e5d5c05](https://github.com/Lurkerrrr/qa-task-hub/commit/e5d5c0554d1f7d0290680aeb76be54ff93f8bb8f))
* implement deleteBug logic in BugController ([1f3097e](https://github.com/Lurkerrrr/qa-task-hub/commit/1f3097ee1976b2cfd40176b64f0eb20bf0f59b65))
* implement getBugById in bugService for ownership verification ([8997ef7](https://github.com/Lurkerrrr/qa-task-hub/commit/8997ef7cc2b794a0adedc1cb6e9a7fe967fb172d))
* implement JWT authentication and refactor backend to MVC architecture ([49ee5bc](https://github.com/Lurkerrrr/qa-task-hub/commit/49ee5bc00fd4119abc3b976f9ef3258df7d72b41))
* implement updateBug and deleteBug SQL queries in bugService ([3fabd02](https://github.com/Lurkerrrr/qa-task-hub/commit/3fabd02faf74ae7e083da6e9a0270c56303ab727))
* implement updateBug logic in BugController ([beee814](https://github.com/Lurkerrrr/qa-task-hub/commit/beee814331f85888d7caa1e2987c3ab76906cd77))
* implemented animated modal window for bug creation form ([e1d2f53](https://github.com/Lurkerrrr/qa-task-hub/commit/e1d2f53fb00aca633c3206221398716615663d18))
* implemented custom UI selectors for priority and assignee with flags ([812e0a6](https://github.com/Lurkerrrr/qa-task-hub/commit/812e0a636aea1aad47ecbebbdc78eee57653d719))
* integrate global error handler and 404 route ([2d6107f](https://github.com/Lurkerrrr/qa-task-hub/commit/2d6107f3f96e949c76ecf80b70b5d5de83567ccd))
* integrate helmet and rate limiting to express server ([95a76b2](https://github.com/Lurkerrrr/qa-task-hub/commit/95a76b23fc8c82bf77617cf64ab9f326e6fd86f7))
* integrate semantic-release for automated versioning and changelogs ([e11c4df](https://github.com/Lurkerrrr/qa-task-hub/commit/e11c4df5e55e853d7d504bfc6fb7702a1a60bbb4))
* migrate backend from sqlite to postgresql with docker ([3b57dab](https://github.com/Lurkerrrr/qa-task-hub/commit/3b57dab4be23b82b7ec60026d97d8999e6bcbf45))
* minor UI updates ([665c6ec](https://github.com/Lurkerrrr/qa-task-hub/commit/665c6ecbc877e5ecce64c0da58994dfa5ef6c408))
* page transitions added using framer-motion ([cf104e1](https://github.com/Lurkerrrr/qa-task-hub/commit/cf104e11853050f2a8dacf1081d5e8a90231b818))
* tracker improvements - validation for steps and conditional time display ([bc74f64](https://github.com/Lurkerrrr/qa-task-hub/commit/bc74f644a1b4e2a6309a0dace3cfbfbcb21d692c))
