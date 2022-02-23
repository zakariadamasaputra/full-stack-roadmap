import {
  Controller,
  Get,
  HttpCode,
  UseGuards,
  Req,
  Param,
  Post,
  Body,
} from '@nestjs/common'
import { RoadmapsService } from './roadmaps.service'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { AddRoadmapDto } from './dto/add-roadmap.dto'

@Controller('roadmaps')
export class RoadmapsController {
  constructor(private readonly roadmapsService: RoadmapsService) {}

  @Get('public')
  @HttpCode(200)
  getAcceptedRoadmaps() {
    return this.roadmapsService.getRoadmaps({ accepted: true })
  }

  @Get()
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  getRoadmaps(@Req() req: any) {
    const { id, role } = req.user
    return this.roadmapsService.getMyRoadmaps(id, role)
  }

  @Get(':id')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  getRoadmap(@Req() req: any, @Param('id') roadmapId: string) {
    const { id, role } = req.user
    return this.roadmapsService.getRoadmap(role, roadmapId, id)
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  addRoadmap(@Body() addRoadmapDto: AddRoadmapDto, @Req() req: any) {
    return this.roadmapsService.addRoadmap(addRoadmapDto, req.user)
  }
}
