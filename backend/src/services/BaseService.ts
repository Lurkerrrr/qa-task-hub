export abstract class BaseService {
    protected formatString(input: string | undefined | null): string {
        if (!input) return '';
        return input.trim();
    }
}