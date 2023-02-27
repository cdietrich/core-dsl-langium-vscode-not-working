import { ValidationAcceptor, ValidationChecks } from 'langium';
import { CoreDslLangiumAstType, DescriptionContent } from './generated/ast';
import type { CoreDslLangiumServices } from './core-dsl-langium-module';

/**
 * Register custom validation checks.
 */
export function registerValidationChecks(services: CoreDslLangiumServices) {
    const registry = services.validation.ValidationRegistry;
    const validator = services.validation.CoreDslLangiumValidator;
    const checks: ValidationChecks<CoreDslLangiumAstType> = {
        DescriptionContent: validator.checkPersonStartsWithCapital
    };
    registry.register(checks, validator);
}

/**
 * Implementation of custom validations.
 */
export class CoreDslLangiumValidator {

    checkPersonStartsWithCapital(person: DescriptionContent, accept: ValidationAcceptor): void {
        // if (person.name) {
        //     const firstChar = person.name.substring(0, 1);
        //     if (firstChar.toUpperCase() !== firstChar) {
        //         accept('warning', 'Person name should start with a capital.', { node: person, property: 'name' });
        //     }
        // }
    }

}
