import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { GraphQLError } from 'graphql';

@Injectable()
export class CustomValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata;

    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToInstance(metatype, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      const formattedErrors = errors.reduce((acc, err) => {
        const field = err.property;
        const constraints = err.constraints || {};
        acc[field] = Object.values(constraints);
        return acc;
      }, {});

      throw new GraphQLError('Validation Error', {
        extensions: {
          code: 'BAD_USER_INPUT',
          validationErrors: formattedErrors,
        },
      });
    }

    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
