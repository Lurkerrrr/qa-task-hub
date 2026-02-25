export abstract class BaseService {
    protected formatString(input: string): string {
        return input.trim();
    }
}