import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateBackedDetailDto } from "./dto/create-backed_detail.dto";
import { UpdateBackedDetailDto } from "./dto/update-backed_detail.dto";
import { BackedDetail } from "./model/backed_model.entity";

@Injectable()
export class BackedDetailsService {
  constructor(
    @InjectModel(BackedDetail)
    private backedDetailModel: typeof BackedDetail 
  ) {}

  async create(createBackedDetailDto: CreateBackedDetailDto) {
    const backedDetail = await this.backedDetailModel.create(
      createBackedDetailDto
    );
    return backedDetail;
  }

  async findAll() {
    return await this.backedDetailModel.findAll({
      include: { all: true }, 
    });
  }

  async findOne(id: number) {
    const backedDetail = await this.backedDetailModel.findByPk(id, {
      include: { all: true }, 
    });
    if (!backedDetail) {
      throw new NotFoundException(`BackedDetail with ID ${id} not found`);
    }
    return backedDetail;
  }

  async update(id: number, updateBackedDetailDto: UpdateBackedDetailDto) {
    const [updated] = await this.backedDetailModel.update(
      updateBackedDetailDto,
      {
        where: { id },
        returning: true,
      }
    );
    if (!updated) {
      throw new NotFoundException(`BackedDetail with ID ${id} not found`);
    }
    return updated[0]; 
  }

  async remove(id: number) {
    const deleted = await this.backedDetailModel.destroy({
      where: { id },
    });
    if (!deleted) {
      throw new NotFoundException(`BackedDetail with ID ${id} not found`);
    }
    return { message: `BackedDetail with ID ${id} has been removed` };
  }
}
