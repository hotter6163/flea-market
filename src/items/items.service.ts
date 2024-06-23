import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Item } from '../entities/item.entity';
import { User } from '../entities/user.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemStatus } from './item-status.enum';
import { ItemRepository } from './item.repository';

@Injectable()
export class ItemsService {
  constructor(private readonly itemRepository: ItemRepository) {}

  async findAll(): Promise<Item[]> {
    return this.itemRepository.find();
  }

  async findById(id: string): Promise<Item | undefined> {
    const item = await this.itemRepository.findOne(id);
    if (!item) {
      throw new NotFoundException();
    }
    return item;
  }

  async create(createItemDto: CreateItemDto, user: User): Promise<Item> {
    return await this.itemRepository.createItem(createItemDto, user);
  }

  async updateStatus(id: string, user: User): Promise<Item> {
    const item = await this.findById(id);
    if (!item) {
      throw new NotFoundException();
    }
    if (item.userId === user.id) {
      throw new BadRequestException('自分の商品を購入することはできません');
    }
    const newItem = {
      ...item,
      status: ItemStatus.SOLD_OUT,
      updatedAt: new Date().toISOString(),
    };

    await this.itemRepository.save(newItem);
    return newItem;
  }

  async delete(id: string, user: User): Promise<void> {
    const item = await this.findById(id);
    if (!item) {
      throw new NotFoundException();
    }
    if (item.userId !== user.id) {
      throw new BadRequestException('自分の商品以外は削除できません');
    }
    await this.itemRepository.delete(id);
  }
}
