import {
  FilterQuery,
  Model,
  QueryOptions,
  SaveOptions,
  UpdateQuery,
  UpdateWithAggregationPipeline,
  Document,
} from 'mongoose';
import {
  CreatedModel,
  RemovedModel,
  UpdatedModel,
} from '../../../common/models/repositories/repositories.model';

export abstract class BaseRepository<T extends Document> {
  constructor(private readonly model: Model<T>) {}

  async create(doc: object, saveOptions?: SaveOptions): Promise<CreatedModel> {
    const createdEntity = new this.model(doc);
    const savedResult = await createdEntity.save(saveOptions);

    return { id: savedResult.id, created: !!savedResult.id };
  }

  async find(filter: FilterQuery<T>, options?: QueryOptions): Promise<T[]> {
    return await this.model.find(filter, null, options);
  }

  async findById(id: string): Promise<T | null> {
    return await this.model.findById(id);
  }

  async findAll(): Promise<T[]> {
    return await this.model.find();
  }

  async remove(filter: FilterQuery<T>): Promise<RemovedModel> {
    const { deletedCount } = await this.model.deleteMany(filter);
    return { deletedCount, deleted: !!deletedCount };
  }

  async updateOne(
    filter: FilterQuery<T>,
    updated: UpdateWithAggregationPipeline | UpdateQuery<T>,
  ): Promise<UpdatedModel> {
    return await this.model.updateOne(filter, updated);
  }

  async updateMany(
    filter: FilterQuery<T>,
    updated: UpdateWithAggregationPipeline | UpdateQuery<T>,
  ): Promise<UpdatedModel> {
    return await this.model.updateMany(filter, updated);
  }
}
