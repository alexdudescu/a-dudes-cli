import { GenericDriver } from '~/drivers/utils/generic-driver';

export class Git implements GenericDriver {
    checkAvailability(): boolean {
        throw new Error('Method not implemented.');
    }
}