import { Role } from '../../enums/role.enum.js';

const SetMetadata = (key: string, value: unknown): ClassDecorator & MethodDecorator =>
	((target: object, propertyKey?: string | symbol, descriptor?: PropertyDescriptor) => {
		const metadataTarget = descriptor?.value ?? target;
		(Reflect as any).defineMetadata(key, value, metadataTarget);
	}) as ClassDecorator & MethodDecorator;

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);