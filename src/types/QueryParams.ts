export type CharacterStatus = 'alive' | 'dead' | 'unknown';

export interface QueryParams {
    name?: string,
    status?: CharacterStatus,
    species?: string,
    type?: string,
    gender?: 'female' | 'male' | 'genderless' | 'unknown',
    page?: number,
}