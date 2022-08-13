import { ObjectID, PrivateThread as PrivateThreadType } from '@uxc/common/node'
import { Schema, model } from 'mongoose'

import { Friend } from './friend'

import type { AsRawDocument, AsReturnDocument } from '../types'
import type { Model, Query } from 'mongoose'

type RawDocument = AsRawDocument<PrivateThreadType>
type ReturnDocument = AsReturnDocument<PrivateThreadType>
type PrivateThreadQuery = Query<PrivateThreadType, any>

interface PrivateThreadModel extends Model<PrivateThreadType> {
  build(attrs: { users: [ObjectID, ObjectID] }): ReturnDocument
  findUserThreads(userId: ObjectID): Promise<PrivateThreadType[]>
}

const PrivateThreadSchema = new Schema<PrivateThreadType>(
  {
    users: [
      {
        ref: 'User',
        required: true,
        type: Schema.Types.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      transform(_, ret: RawDocument) {
        delete ret.__v
      },
    },
  },
)

PrivateThreadSchema.index({ '$**': 'text' })

PrivateThreadSchema.statics.findUserThreads = async function findUserThreads(
  userId: ObjectID,
) {
  const friends = await Friend.findFriends(userId)

  return this.find({
    $and: [
      {
        users: { $in: [{ _id: userId }] },
      },
      {
        users: { $in: friends },
      },
    ],
  }).populate('users')
}

PrivateThreadSchema.statics.build = attrs => new PrivateThread(attrs)

export const PrivateThread = model<RawDocument, PrivateThreadModel>(
  'PrivateThread',
  PrivateThreadSchema,
)
