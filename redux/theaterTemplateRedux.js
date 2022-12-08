exports.THEATER_TEMPLATE_ACTION = {
  UPDATE_TILE: "update_title",
  ADD_ROW: "update_row",
  ADD_COLUMN: "update_column",
};
exports.theaterTemplateReducer = (template, action) => {
  switch (action.type) {
    case this.THEATER_TEMPLATE_ACTION.ADD_ROW:
      return {
        ...template,
        layout:{
          ...template.layout,
          
        }
      }
    case this.THEATER_TEMPLATE_ACTION.ADD_COLUMN:
  }
};
