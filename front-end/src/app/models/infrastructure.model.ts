import {Deserializable} from "./deserializable.model";

class InfrastructureElement implements Deserializable {
  id: string;
  instanceType: string;
  keyName: string;
  tags: Object;

  deserialize(input: any) {
    this.id = Object.keys(input)[0];
    this.instanceType = input[this.id]['instance_type']
    this.keyName = input[this.id]['key_name'].split('.')[1]
    this.tags = input[this.id]['tags']
    return this
  }
}

export class Infrastructure implements Deserializable {
  data = []
  deserialize(input: any) {
    this.data = []
    for (let inst of input) {
      // console.log(inst)
      let element = new InfrastructureElement().deserialize(inst)
      this.data.push(element);
    }
    return this
  }
}
