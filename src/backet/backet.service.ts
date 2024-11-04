import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateBacketDto } from "./dto/create-backet.dto"; 
import { UpdateBacketDto } from "./dto/update-backet.dto"; 
import { Product } from "../product/model/product.entity"; 
import { Backet } from "./models/backet.model";

@Injectable()
export class BacketService {
  constructor(
    @InjectModel(Backet) private backetModel: typeof Backet 
  ) {}

  async create(createBacketDto: CreateBacketDto) {
    const backet = await this.backetModel.create(createBacketDto);
    return backet;
  }

  async findAll() {
    return await this.backetModel.findAll({
      include: {all: true}, 
    });
  }

  async findOne(id: number) {
    const backet = await this.backetModel.findByPk(id);
    if (!backet) {
      throw new NotFoundException(`Backet with ID ${id} not found`); 
    }
    return backet;
  }

  // Savatchani yangilash
  async update(id: number, updateBacketDto: UpdateBacketDto) {
    const [updated] = await this.backetModel.update(updateBacketDto, {
      where: { id },
      returning: true,
    });
    if (!updated) {
      throw new NotFoundException(`Backet with ID ${id} not found`); 
    }
    return updated[0]; 
  }

  async remove(id: number) {
    const deleted = await this.backetModel.destroy({ where: { id } });
    if (!deleted) {
      throw new NotFoundException(`Backet with ID ${id} not found`); 
    }
    return { message: `Backet with ID ${id} has been removed` }; 
  }
}
