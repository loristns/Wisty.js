import { TrainingMetrics } from '../hcn';
export declare class Visor {
    private internalVisor;
    private losses;
    private accuracies;
    constructor();
    onEpochEnd(): (metrics: TrainingMetrics[]) => void;
}
