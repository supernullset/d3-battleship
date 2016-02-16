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

export function place_ship(ship, occupied) {
    let ship_placed = false
    let ship_length = ship[0]
    let bad_canidates = []
    let vertical = false
    let r = Math.round(Math.random() * 10)

    let is_viable_point = function(x,y) {
        let point = [x, y].toString()
        return (occupied.indexOf(point) == -1) && (bad_canidates.indexOf(point) == -1)
    }

    if (r <= 5) {
        vertical = true
    }

    while (ship_placed == false) {
        let start_x = Math.round(Math.random() * 9)
        let start_y = Math.round(Math.random() * 9)

        // if the guess cell is occupied, try again
        if (!is_viable_point(start_x, start_y)) {
            continue
        }

        let placement_direction;
        let r = Math.round(Math.random() * 9)

        // Search for canidates for placing a ship
        if (vertical) { // Account for vertical placement
            if ((start_x + ship_length) > 9) {
                continue
            } else {
                let is_placeable = true;
                for (let i=0; i < ship_length; i++) {
                    if (!is_viable_point(start_x + i, start_y)) {
                        is_placeable = false
                    }
                }
                if (is_placeable == true){
                    for (let i=0; i < ship_length; i++) {
                        let cell = [start_x + i, start_y].toString()
                        occupied.push(cell)
                    }
                    ship_placed = true
                }
            }

            if ((start_x - ship_length) < 0) {
                continue
            } else {
                let is_placeable = true;
                for (let i=0; i < ship_length; i++) {
                    if (!is_viable_point(start_x - i, start_y)) {
                        is_placeable = false
                    }
                }
                if (is_placeable == true) {
                    for (let i=0; i < ship_length; i++) {
                        let cell = [start_x - i, start_y].toString()
                        occupied.push(cell)
                    }
                    ship_placed = true
                }
            }
        } else {
            if ((start_y + ship_length) > 9) {
                continue
            } else {
                let is_placeable = true;
                for (let i=0; i < ship_length; i++) {
                    if (!is_viable_point(start_x, start_y + i)) {
                        is_placeable = false
                    }
                }
                if (is_placeable == true) {
                    for (let i=0; i < ship_length; i++) {
                        let cell = [start_x, start_y + i].toString()
                        occupied.push(cell)
                    }
                    ship_placed = true
                }
            }

            if ((start_y - ship_length) < 0) {
                break
            } else {
                let is_placeable = true;
                for (let i=0; i < ship_length; i++) {
                    if (is_viable_point(start_x, start_y - i)) {
                        is_placeable = false
                    }
                }
                if (is_placeable == true) {
                    for (let i=0; i < ship_length; i++) {
                        let cell = [start_x, start_y - i].toString()
                        occupied.push(cell)
                    }
                    ship_placed = true
                }
            }
        }
    }
    return
}


export function assign_ship_placement(gridSize) {

    //assume initial state is horizontal
    let ship_dimensions = [[5, 1], [4, 1], [3, 1], [3, 1], [3, 1]]
    let occupied = []

    ship_dimensions.forEach((ship) => {
        place_ship(ship, occupied)
    })

    return occupied
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

