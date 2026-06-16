// Barrel des repositories : classes mères (abstraites) + enfants + types.
// AUCUNE instance ici : l'instanciation et le choix Fake/Firestore sont faits
// par le conteneur d'injection (../container.ts). L'UI ne dépend jamais d'un
// repository directement — elle passe par les use cases.

export { ConfigGeneraleRepository } from "./config-generale.repository";
export { FakeConfigGeneraleRepository } from "./config-generale.fake";
export { FirestoreConfigGeneraleRepository } from "./config-generale.firestore";

export { PlatRepository, type PlatQuery } from "./plat.repository";
export { FakePlatRepository } from "./plat.fake";
export { FirestorePlatRepository } from "./plat.firestore";

export { FormuleRepository, type FormuleQuery } from "./formule.repository";
export { FakeFormuleRepository } from "./formule.fake";
export { FirestoreFormuleRepository } from "./formule.firestore";

export { PageRepository } from "./page.repository";
export { FakePageRepository } from "./page.fake";
export { FirestorePageRepository } from "./page.firestore";
