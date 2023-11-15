type ExcutionRun = (
  currentCall: number,
  isValidCurrentCall: (currentCall: number) => boolean,
) => void | Promise<void>;

type ExcutionErrorHandling = (error: Error) => void | Promise<void>;

class Execution {
  private currentCall = 0;

  async run(fn: ExcutionRun, catchError?: ExcutionErrorHandling) {
    try {
      this.currentCall++;
      await fn(this.currentCall, v => this.currentCall === v);
    } catch (error) {
      if (catchError) {
        await catchError(error as Error);
      } else {
        throw error;
      }
    }
  }

  async continue(fn: ExcutionRun, catchError?: ExcutionErrorHandling) {
    try {
      await fn(this.currentCall, v => this.currentCall === v);
    } catch (error) {
      if (catchError) {
        await catchError(error as Error);
      } else {
        throw error;
      }
    }
  }
}

export default Execution;
