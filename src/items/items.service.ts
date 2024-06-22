import { Injectable, NotFoundException } from '@nestjs/common';
import { Item } from '../entities/item.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemStatus } from './item-status.enum';
import { ItemRepository } from './item.repository';

@Injectable()
export class ItemsService {
  constructor(private readonly itemRepository: ItemRepository) {}

  private items: Item[] = [];

  async findAll(): Promise<Item[]> {
    return this.itemRepository.find();
  }

  async findById(id: string): Promise<Item | undefined> {
    return await this.itemRepository.findOne(id);
  }

  async create(createItemDto: CreateItemDto): Promise<Item> {
    return await this.itemRepository.createItem(createItemDto);
  }

  async updateStatus(id: string): Promise<Item> {
    const item = await this.findById(id);
    if (!item) {
      throw new NotFoundException();
    }
    const newItem = {
      ...item,
      status: ItemStatus.SOLD_OUT,
      updatedAt: new Date().toISOString(),
    };

    await this.itemRepository.save(newItem);
    return newItem;
  }

  async delete(id: string): Promise<void> {
    await this.itemRepository.delete(id);
  }
}
