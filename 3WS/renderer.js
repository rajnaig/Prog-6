export class Renderer {
  renderStudentCards(studentList) {
    let x = "";
    studentList.forEach((element) => {
      x += `
      <form class="d-flex">
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="modal fade" id="detailsModal${element.id}">
          <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
              <div class="modal-header">
                <h2>Detailed information</h2>
              </div>
              <div class="modal-body">
                
              <div class="card mx-1 my-1" style="max-width: 540px;">
              <div class="row g-0">
                <div class="col-md-4">
                  <img src="${element.image}" class="img-fluid rounded-start" alt="...">
                </div>
                
                <div class="modal-body">
                
                <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" role="switch" id="update-isActive" ${element.isActive ? 'checked' : ''}>
                <label class="form-check-label" for="update-isActive">isActive</label>
              </div>
                
                    <div class="form-group">
                      <label for="name">Name</label>
                      <input type="text" class="form-control" id="update-name" name="name" value="${element.name}">
                    </div>
                    <div class="form-group">
                      <label for="birthYear">Birth Year</label>
                      <input type="number" class="form-control" id="update-birthYear" name="birthYear" value="${element.birthYear}">
                    </div>
                    <div class="form-group">
                      <label for="connections">Connections</label>
                      <input type="text" class="form-control" id="update-connections" name="connections" value="${element.connections}">
                    </div>

                    <div class="form-group">
                      <label for="activeSemesterCount">Active Semesters Count</label>
                      <input type="number" class="form-control" id="update-activeSemesterCount" name="activeSemesterCount" value="${element.activeSemesterCount}">
                    </div>
                    <div class="form-group">
                      <label for="completedCredits">Completed Credits</label>
                      <input type="number" class="form-control" id="update-completedCredits" name="completedCredits" value="${element.completedCredits}">
                    </div>

                    <div class="form-group">
                      <label for="image">Image Url</label>
                      <input type="text" class="form-control" id="update-image" name="image" value="${element.image}">
                    </div>
                  </div>
              </div>
            </div>

              </div>
              <div class="modal-footer d-flex aligns-items-center justify-content-center">
              <button type="button" class="btn btn-primary" data-stud-id="${element.id}" id="update-student-btn"  data-dismiss="modal">Update</button>

                <button type="button" class="btn btn-danger"  data-stud-id="${element.id}" data-dismiss="modal"        id="delete-student-btn" >Delete Student</button>
                <input class="btn btn-outline-danger" data-dismiss="modal" value="Close">
              </div>
            </div>
          </div>
        </div>

        <div class="card ${isActive(element.isActive)} mx-3 my-3" style="cursor: pointer; height: 200px; min-width: 200px;" data-toggle="modal" data-target="#detailsModal${element.id}">
          <img src="${element.image}" class="img-fluid rounded-circle w-75 mx-auto my-auto mt-1" alt="..." style="max-width: 50px; max-height: 50px;">
          <div class="card-body">
          <h5 class="card-title text-truncate text-center" style="max-height: 50px;">${element.name}</h5>
          </div>
        </div>

      </div>
    </div>
  </div> 
</form>



      `;
    });

    return x;
  }
}


function isActive(status) {
    return status
    ?
    'border-3 border-success'
    :
    'border-3  border-danger';
}
