import chalk from 'chalk';
import { Command } from 'commander';
import { DescriptionContent } from '../language-server/generated/ast';
import { CoreDslLangiumLanguageMetaData } from '../language-server/generated/module';
import { createCoreDslLangiumServices } from '../language-server/core-dsl-langium-module';
import { extractAstNode } from './cli-util';
import { generateJavaScript } from './generator';
import { NodeFileSystem } from 'langium/node';

export const generateAction = async (fileName: string, opts: GenerateOptions): Promise<void> => {
    const services = createCoreDslLangiumServices(NodeFileSystem).CoreDslLangium;
    const lexer = services.parser.Lexer
    // const m = `InstructionSet X_LUM extends RISCVBase {
    //     instructions {
    //       LUMINANCE {
    //         encoding: 7'b0 :: rs2[4:0] :: rs1[4:0] :: 3'b011 :: rd[4:0] :: 7'b0010111;
    //         behavior: {
      
    //         }
    //       }
    //     }
    //   }`
    const m = `import 'aa'`
    //const m = "4"
    const res = lexer.tokenize(m)
      console.log(res)
      for (var val of res.tokens) {
        console.log(val.tokenType.name)
      }

    const model = await extractAstNode<DescriptionContent>(fileName, services);
    const generatedFilePath = generateJavaScript(model, fileName, opts.destination);
    console.log(chalk.green(`JavaScript code generated successfully: ${generatedFilePath}`));
};

export type GenerateOptions = {
    destination?: string;
}

export default function(): void {
    const program = new Command();

    program
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        .version(require('../../package.json').version);

    const fileExtensions = CoreDslLangiumLanguageMetaData.fileExtensions.join(', ');
    program
        .command('generate')
        .argument('<file>', `source file (possible file extensions: ${fileExtensions})`)
        .option('-d, --destination <dir>', 'destination directory of generating')
        .description('generates JavaScript code that prints "Hello, {name}!" for each greeting in a source file')
        .action(generateAction);

    program.parse(process.argv);
}
