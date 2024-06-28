async function main(): Promise<number> {
    //npm run weather Location
    if (process.argv.length !== 3) {
        console.error("usage: weather Location");
        return 1;
    }

    const location = process.argv[2];
    console.log(process.argv)
    return await Promise.resolve(0);

}

main().catch((error) => console.error(error));