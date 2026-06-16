import type {
  FormuleQuery,
  FormuleRepository,
} from "../repositories/formule.repository";
import type { Formule } from "../types/models";

export class GetFormulesUseCase {
  constructor(private readonly repo: FormuleRepository) {}
  execute(query?: FormuleQuery): Promise<Formule[]> {
    return this.repo.getAll(query);
  }
}

export class GetFormuleBySlugUseCase {
  constructor(private readonly repo: FormuleRepository) {}
  execute(slug: string): Promise<Formule | null> {
    return this.repo.getBySlug(slug);
  }
}
