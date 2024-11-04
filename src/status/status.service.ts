import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateStatusDto } from "./dto/create-status.dto";
import { UpdateStatusDto } from "./dto/update-status.dto";
import { Status } from "./models/status.model"; 

@Injectable()
export class StatusService {
  constructor(@InjectModel(Status) private statusModel: typeof Status) {}

  async create(createStatusDto: CreateStatusDto) {
    const status = await this.statusModel.create(createStatusDto);
    return status;
  }

  async findAll() {
    return await this.statusModel.findAll();
  }

  async findOne(id: number) {
    const status = await this.statusModel.findByPk(id);
    if (!status) {
      throw new NotFoundException(`Status with ID ${id} not found`);
    }
    return status;
  }

  async update(id: number, updateStatusDto: UpdateStatusDto) {
    const [updated] = await this.statusModel.update(updateStatusDto, {
      where: { id },
      returning: true,
    });
    if (!updated) {
      throw new NotFoundException(`Status with ID ${id} not found`);
    }
    return updated[0];
  }

  async remove(id: number) {
    const deleted = await this.statusModel.destroy({ where: { id } });
    if (!deleted) {
      throw new NotFoundException(`Status with ID ${id} not found`);
    }
    return { message: `Status with ID ${id} has been removed` };
  }
}
