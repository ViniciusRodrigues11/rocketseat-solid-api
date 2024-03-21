export class ResourceNotFound extends Error {
  constructor(resource: string) {
    super(`${resource} not found`);
  }
}
