import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { RestaurantTableService } from './restaurantTable.service';
import { CreateRestaurantTableDto } from './dto/create-restaurantTable.dto';
import { UpdateRestaurantTableDto } from './dto/update-restaurantTable.dto';

@Controller('restaurant-table')
export class RestaurantTableController {
  constructor(
    private readonly restaurantTableService: RestaurantTableService,
  ) {}

  @Post()
  create(@Body() createRestaurantTableDto: CreateRestaurantTableDto) {
    return this.restaurantTableService.create(createRestaurantTableDto);
  }

  @Get()
  findAll() {
    return this.restaurantTableService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.restaurantTableService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateRestaurantTableDto: UpdateRestaurantTableDto,
  ) {
    return this.restaurantTableService.update(id, updateRestaurantTableDto);
  }

  @Delete(':id')
  softDelete(@Param('id') id: string) {
    return this.restaurantTableService.softDelete(id);
  }
}
