import { MetricsDisplayFilter } from './metrics-display-filter';
import { ProbeReport } from '../model/probe-report';

export class ObtentionFilter implements MetricsDisplayFilter<any[]> {
  matches(input: ProbeReport): boolean {
    return input.data[1] > 0;
  }

  getName(): string {
    return 'ObtentionFilter';
  }
}
