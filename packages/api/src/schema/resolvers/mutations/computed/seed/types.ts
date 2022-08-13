import type { ObjectID } from '@uxc/common/node'

export enum SeedModes {
  TEST = 0,
}

export type PartitionedTasks = [Promise<any>[], ObjectID[]]

export interface Taskable {
  save: () => Promise<any>
  _id: ObjectID
}

export interface MaybePassword {
  password?: string
}
