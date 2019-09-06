// src/app/shared/models/user.model.ts

import {Deserializable} from "./deserializable.model";

export class Instance implements Deserializable {
  data = []
  deserialize(input: any) {
    for (let attr in input) {
      if (attr.includes('all') == false &&
          attr.includes('type') == false &&
          attr.includes('role') == false &&
          attr.includes('env') == false &&
          attr.includes('.') == false
        ) {
          this.data.push({instanceId: attr, instanceIP: input[attr]})
        }
    }
    return this;
  }
}
