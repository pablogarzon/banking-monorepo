import { Controller, Get } from '@nestjs/common';

@Controller('company')
export class CompanyController {

    @Get()
    getHello(): string {
    return "HELLO COMP";
    }
}
