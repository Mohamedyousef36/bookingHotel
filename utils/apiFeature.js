class ApiFeature {
  constructor(buildingQuery, queryString) {
    this.buildingQuery = buildingQuery;
    this.queryString = queryString;
  }
  filtering() {
    const queryObject = { ...this.queryString };
    // to filter query from this keyword
    const filteringQuery = ["page", "limit", "sort", "fields", "keyword"];
    filteringQuery.forEach((el) => {
      delete queryObject[el];
    });
    // convert queryObject from json to string
    let queryString = JSON.stringify(queryObject);
    // filtering method
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`);
    this.buildingQuery = this.buildingQuery.find(JSON.parse(queryString)); //why

    return this;
  }

  pagination(numberOfDocuments) {
    // Start Pagination methods
    const page = parseInt(this.queryString.page) || 1; 
      const limit = parseInt(this.queryString.limit) || 8;
    const skip = (page - 1) * limit;
    const endIndex = page * limit;
    const pagination = {};
    pagination.page = page;
    pagination.limit = limit;
    pagination.numberOfPage = Math.ceil(numberOfDocuments / limit);

    // ## => Next Page
    if (endIndex < numberOfDocuments) {
      pagination.next = page + 1;
    }

    // ## => Previous Page

    if (endIndex > 0) {
      pagination.prev = page - 1;
    }
    this.buildingQuery = this.buildingQuery.skip(skip).limit(limit);
    this.paginationResult = pagination;
    return this;
  }

  // Building Query (Prepare Query To Execute)

  // End Pagination

  sorting() {
    // Start Sorting
    if (this.queryString.sort) {
      const sort = this.queryString.sort.split(",").join(" ");
      this.buildingQuery = this.buildingQuery.sort(sort);
    } else {
      this.buildingQuery = this.buildingQuery.sort("-createdAt");
    }
    return this;

    // End Sorting
  }

  fields() {
    // Start Fields

    // to enable front end to choice property return

    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.buildingQuery = this.buildingQuery.select(fields);
    } else {
      this.buildingQuery = this.buildingQuery.select("-__v");
      }
            return this;

    // End Fields
  }

  searching() {
    // Start Searching Method
    if (this.queryString.keyword) {
      const query = {};
      query.$or = [
        { name: { $regex: this.queryString.keyword, $options: "i" } },
        { city: { $regex: this.queryString.keyword, $options: "i" } },
      ];
     
      this.buildingQuery = this.buildingQuery.find(query);
      // End Searching Method
    }
          return this;

  }
  // find => return query so i can chain method like skip limit populate (find like an object)
}
export default ApiFeature;
