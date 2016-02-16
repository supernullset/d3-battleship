export function handle_click(element, hit_boxes) {
    let status_color;
    let hit_color = "#75AF1D"
    let miss_color = "#CC3300"
    let cell = d3.select(element)

    if (hit_boxes.indexOf(cell.attr("index")) != -1) {
        status_color = hit_color
    } else {
        status_color = miss_color
    }
    cell.style("fill", status_color)
}

export function assign_ship_placement(gridSize) {

    //assume initial state is horizontal
    let ship_dimensions = [[5, 1], [4, 1], [3, 1], [3, 1], [3, 1]]
    let occupied = []

    let is_vertical = (ship) => ship[0] == 1
    let is_horizontal = (ship) => !is_vertical(ship)

    function place_ship(ship, occupied) {
        let ship_placed = false
        let ship_length
        let vertical = is_vertical(ship)

        if vertical {
            ship_length = ship[1]
        } else {
            ship_length = ship[0]
        }

        while (ship_placed == false) {
            let start_guess = [
                Math.round(Math.random() * 10),
                Math.round(Math.random() * 10)
            ]

            ship.forEach((cell) => {

            })
        }
        return
    }

    ship_dimensions.forEach((ship) => {
        let r = Math.round(Math.random() * 10)
        if (r <= 5) {
            place_ship(ship, occupied)
        } else {
            place_ship(ship.reverse(), occupied)
        }
    })

    return [[5,3], [5,4], [5,5]].map((e) => e.toString())
}

export function build_board(targetId, gridSize) {
    let gridDefinition = []
    let hit_boxes = assign_ship_placement(gridSize)
    let order = 0
    for (let yOrigin=0, i=0; i < gridSize; i++) {
        for (let xOrigin = 0, j=0; j < gridSize; j++) {
            gridDefinition.push({
                x: xOrigin * 50,
                y: yOrigin * 50,
                width: 50,
                height: 50,
                index: [i,j].toString(),
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
        .on('click', function(){ handle_click(this, hit_boxes) })
        .style("fill", '#FFF')
        .style("stroke", '#555')
}

build_board("#board", 10);

