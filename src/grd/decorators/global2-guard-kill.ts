import { SetMetadata } from '@nestjs/common';

export const G2_GRD_KILL_KEY = 'G2_grd_kill';
export const Global2GuardKill = (kill: boolean) => SetMetadata(G2_GRD_KILL_KEY, kill);
