class ctable {
  private can_edit = null;
  private instance: JQuery = null;
  private editable_run = false;

  constructor(config?: ctableOpt) {
    if (typeof config == "object") {
      if (config.hasOwnProperty("editable") && config.editable) {
        this.can_edit = true;
      }
    }
  }

  create(id: string, where: string, data: string[]) {
    let table = `<table id='${id}' class='table table-responsive' style="position:relative"><thead><tr>`;
    const self = this;
    for (let i = 0; i < data.length; i++) {
      table = table + "<th>" + data[i] + "</th>";
    }
    table = table + "</tr></thead><tbody></tbody></table>";
    document.getElementById(where).innerHTML += table;
    if (this.can_edit) {
      setTimeout(function () {
        self.instance = $(`table#${id}`);
        self.instance.append(
          `<span class="table-add fas fa-plus text-success" style="position: absolute;right:15px;top:15px;cursor:pointer"></span>`
        );
        self.instance.find("tbody").append(`<tr class="addthis d-none">
        <td contenteditable="true">Untitled</td>
        <td contenteditable="true">Undocumented</td>
        <td><span class="table-remove fas fa-trash text-danger" style="cursor:pointer"></span></td><td> <span class="table-up fas fa-arrow-up text-info" style="cursor:pointer"></span> <span class="table-down fas fa-arrow-down text-info" style="cursor:pointer"></span> </td>
      </tr>`);
        self.editable(true);
      }, 500);
    }
  }

  add(table: string, data: any[]) {
    let row = "<tr>";
    for (let i = 0; i < data.length; i++) {
      let td = data[i];
      if (typeof td == "object" || Array.isArray(td)) {
        td = `<pre class="json">${JSON.stringify(td, null, 2)}</pre>`;
      }
      if (!this.can_edit) {
        row += "<td>" + td + "</td>";
      } else {
        row += '<td contenteditable="true">' + td + "</td>";
      }
    }
    if (this.can_edit) {
      row += `<td><span class="table-remove fas fa-trash text-danger" style="cursor:pointer"></span></td><td> <span class="table-up fas fa-arrow-up text-info" style="cursor:pointer"></span> <span class="table-down fas fa-arrow-down text-info" style="cursor:pointer"></span> </td>`;
    }
    row += "</tr>";
    document.getElementById(table).getElementsByTagName("tbody")[0].innerHTML += row;
  }

  private editable(activate?: boolean) {
    const self = this;
    if (this.editable_run) {
      return;
    }
    if (activate && self.instance && self.instance.length) {
      this.editable_run = true;
      $(document).on("click", ".table-add", function (e) {
        e.preventDefault();
        const $clone = self.instance.find("tr.addthis").clone(true).removeClass("d-none");
        self.instance.find("table").append($clone);
      });

      $(".table-remove").click(function () {
        $(this).parents("tr").detach();
      });

      $(".table-up").click(function () {
        const $row = $(this).parents("tr");
        if ($row.index() === 1) return; // Don't go above the header
        $row.prev().before($row.get(0));
      });

      $(".table-down").click(function () {
        const $row = $(this).parents("tr");
        $row.next().after($row.get(0));
      });
    }
  }
}

interface ctableOpt {
  editable?: boolean;
}
