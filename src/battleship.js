export function handle_click(element) {
    let cell = d3.select(this)
    cell.style("fill", "#CC3300")
    console.log(element)
}

export function build_board(targetId, gridSize) {
    let gridDefinition = []
    let order = 0
    for (let yOrigin=0, i=0; i < gridSize; i++) {
        for (let xOrigin = 0, j=0; j < gridSize; j++) {
            gridDefinition.push({
                x: xOrigin * 50,
                y: yOrigin * 50,
                width: 50,
                height: 50,
                index: [i,j],
                order: order
            })
            xOrigin++;
            order++;
        }
        yOrigin++;        
        order++;
    }

    let canvas = d3.select(targetId).append("svg")
        .attr("width", 500)
        .attr("height", 500)
    
    let board = canvas.selectAll(".board")
        .data([gridDefinition])
        .enter().append("svg:g")
        .attr("class", "board")

    let cells = board.selectAll(".cell")
        .data( gridDefinition )
        .enter().append("svg:rect")
        .attr("x", (d) => d.x )
        .attr("y", (d) => d.y )
        .attr("width", (d) => d.width )
        .attr("height", (d) => d.height )
        .attr("index", (d) => d.index )
        .on('click', (d) => handle_click(d))
        .style("fill", '#FFF')
        .style("stroke", '#555')
}

build_board("#board", 10);

