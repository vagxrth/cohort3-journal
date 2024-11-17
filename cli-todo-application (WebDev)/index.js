import { Command } from 'commander';
import fs from 'fs';

const program = new Command();

program
    .name('TODO')
    .description('TODO CLI')
    .version('0.8.0');

program.command('add')
    .description('Add an item to TOOD')
    .argument('<file>', 'file to add into')
    .argument('<data>', 'data to add')
    .argument('<time>', 'time to associate with the data')
    .action((file, data, time) => {
        const content = `Task: ${data} Time: ${time}\n`
        fs.appendFile(file, content, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Add an item to TOOD")
            }
        });
    });

program.command('delete')
    .description('Delete an item from TODO')
    .argument('<file>', 'file to delete from')
    .argument('<data>', 'data to delete')
    .action((file, del) => {
        fs.readFile(file, 'utf-8', (err, data) => {
            if (err) {
                console.log(err);
            } else {
                const lines = data.split('\n');
                const item = lines.filter(line => !line.includes(del));
                const updated = item.join('\n');
                fs.writeFile(file, updated, (err) => {
                    if (err) {
                        console.log(err);
                    }
                    console.log("Item deleted from TODO");
                })
            }
        });
    });

program.command('done')
    .description('mark an item from TODO as done')
    .argument('<file>', 'file to mark from')
    .argument('<data>', 'data to mark')
    .action((file, item) => {
        fs.readFile(file, 'utf-8', (err, data) => {
            if (err) {
                console.log(err);
            } else {
                const lines = data.split('\n');
                const itemDone = lines.map(line => {
                    if (line.includes(item) && !line.includes('✅')) {
                        return `${line} ✅`
                    }
                    return line
                });
                const updated = itemDone.join('\n');
                fs.writeFile(file, updated, (err) => {
                    if (err) {
                        console.log(err);
                    }
                    console.log("Item marked as completed");
                })
            }
        });
    });

program.parse();