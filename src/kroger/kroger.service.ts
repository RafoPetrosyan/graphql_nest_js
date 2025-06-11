// src/kroger/kroger.service.ts
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KrogerToken } from './entities/kroger-token.entity';

@Injectable()
export class KrogerService {
  constructor(
    private readonly http: HttpService,
    @InjectRepository(KrogerToken)
    private readonly tokenRepo: Repository<KrogerToken>,
  ) {}

  async getAccessToken(): Promise<string> {
    const cached = await this.tokenRepo.findOneBy({ id: 1 });

    const now = Math.floor(Date.now() / 1000);
    if (cached && cached.expiresAt > now) {
      return cached.token;
    }

    const clientId = process.env.KROGER_CLIENT_ID!;
    const clientSecret = process.env.KROGER_CLIENT_SECRET!;
    const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    const { data } = await firstValueFrom(
      this.http.post(
        'https://api-ce.kroger.com/v1/connect/oauth2/token',
        new URLSearchParams({
          grant_type: 'client_credentials',
          scope: 'product.compact',
        }),
        {
          headers: {
            Authorization: `Basic ${basic}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      ),
    );

    const token = data.access_token;
    const expiresAt = now + 1800;

    const tokenRecord = this.tokenRepo.create({ id: 1, token, expiresAt });
    await this.tokenRepo.save(tokenRecord);

    return token;
  }

  async getLocationsByZip(zipCode: string) {
    const token = await this.getAccessToken();

    const res = await firstValueFrom(
      this.http.get('https://api-ce.kroger.com/v1/locations', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          'filter.zipCode.near': zipCode,
        },
      }),
    );

    return res.data;
  }

  async getProductsByLocation(locationId: string, term: string) {
    const token = await this.getAccessToken();

    const res = await firstValueFrom(
      this.http.get('https://api-ce.kroger.com/v1/products', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          'filter.locationId': locationId,
          'filter.term': term,
        },
      }),
    );

    return res.data;
  }
}
