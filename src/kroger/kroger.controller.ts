// src/kroger/kroger.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { KrogerService } from './kroger.service';

@Controller('kroger')
export class KrogerController {
  constructor(private readonly krogerService: KrogerService) {}

  @Get('locations')
  getLocations(@Query('zip') zip: string) {
    return this.krogerService.getLocationsByZip(zip);
  }

  @Get('products')
  getProducts(
    @Query('locationId') locationId: string,
    @Query('term') term: string,
  ) {
    return this.krogerService.getProductsByLocation(locationId, term);
  }
}
