
export class Diff {

  firstResult: string;
  secondResult: string;
  different: boolean;
  diff: string;

  constructor(firstResult: string, secondResult: string, different: boolean, diff: string) {
    this.firstResult = firstResult;
    this.secondResult = secondResult;
    this.different = different;
    this.diff = diff;
  }
}
