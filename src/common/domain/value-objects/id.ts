import { v4, NIL } from 'uuid';

export class Id {
  private _value: number | string = NIL;
  private static _nullId = NIL;

  private constructor(id?: number | string | undefined) {
    if (!id) {
      this._value = v4();
    } else if (id === 0) {
      this._value = NIL;
    } else {
      this._value = id;
    }
  }

  public get value(): number | string {
    return this._value;
  }

  public static get nullId(): string {
    return this._nullId;
  }

  public static create(id?: number | string | undefined) {
    return new Id(id);
  }
}
