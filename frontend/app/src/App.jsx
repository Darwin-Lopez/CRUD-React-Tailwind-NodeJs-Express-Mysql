import { useEffect, useState } from "react"
import Axios from "axios"
import RowData from "./components/RowData";
import Swal from 'sweetalert2'

function App() {
  const [user, setUser] = useState({
    id: "",
    nombre: "",
    edad: "",
    pais: "",
    cargo: "",
    anios: ""
  })



  useEffect(() => {
    getList();
  }, [])



  const [empty, setEmpty] = useState(true);
  const [list, setList] = useState([]);
  const [editar, setEditar] = useState(false);

  const valuesFields = (e) => {
    setEmpty(true)
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const add = () => {

    if (!user.nombre || !user.edad || !user.pais || !user.cargo || !user.anios) {
      setEmpty(false)
      return;
    }

    Axios.post("http://localhost:3000/create", user)
      .then(() => {
        getList()
        limpiarCampos();
        Swal.fire({
          title: "<strong>Usuario Insertado</strong>",
          html: `El usuario <b>${user.nombre}</b> fue registrado exitosamente`,
          icon: "success",
          timer: 3000,
          timerProgressBar: true
        })
      }).catch(function (error) {
          Swal.fire({
            title: "Oops...",
            text: JSON.stringify(error.message && "Intentelo mas tarde"),
            icon: "error",
          });
        })

    console.table(user)
  }

  const update = () => {

    if (!user.nombre || !user.edad || !user.pais || !user.cargo || !user.anios) {
      setEmpty(false)
      return;
    }

    Axios.put("http://localhost:3000/update", user)
      .then(() => {
        getList()
        Swal.fire({
          title: "<strong>Registro Actualizado</strong>",
          html: `El usuario <b>${user.nombre}</b> fue actualizado exitosamente`,
          icon: "success",
          timer: 3000,
          timerProgressBar: true
        })
      }).catch(function (error) {
          Swal.fire({
            title: "Oops...",
            text: JSON.stringify(error.message && "Intentelo mas tarde"),
            icon: "error",
          });
        })
    limpiarCampos();
    console.table(user)
  }


  const deletee = (val) => {
    Swal.fire({
      title: "<strong>Eliminacion de Registro</strong>",
      html: `¿Estas seguro de eliminar al usuario <b>${val.nombre}</b>?`,
      icon: "warning",
      timerProgressBar: true,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3000/delete/${val.id}`,).then(() => {
          getList();
          limpiarCampos();
          Swal.fire({
            title: "Registro Eliminado!",
            html: `El usuario <b>${val.nombre}</b> fue eliminado con exito.`,
            icon: "success",
            draggable: true
          });
        }).catch(function (error) {
          Swal.fire({
            title: "Oops...",
            text: JSON.stringify(error.message && "Intentelo mas tarde"),
            icon: "error",
          });
        })
      }
    })
  }

  const getList = async () => {
    const response = await fetch("http://localhost:3000/listar");
    const data = await response.json();
    setList(data);
  }

  const limpiarCampos = () => {
    setUser({
      nombre: "",
      edad: "",
      pais: "",
      cargo: "",
      anios: ""
    })
  }

  const returnDataById = (val) => {
    setUser(val)
    setEditar(true)
    setEmpty(true)
  }

  const calncelEdit = () => {
    setEditar(false)
    setUser({
      nombre: "",
      edad: "",
      pais: "",
      cargo: "",
      anios: ""
    })
  }

  const getAllList = list.map((val, index) => {
    return (
      <RowData data={val} deleteFun={deletee} returnData={returnDataById} index={index}></RowData>
    )
  })


  return (
    <>
      <div className="app container m-auto mt-4 px-3">
        <h1 className="bg-gray-200 text-center text-2xl uppercase font-bold rounded-t-2xl p-2">Gestion de empleados</h1>
        <div className="flex flex-col gap-3 shadow rounded-b-2xl w-full p-5">
          <label className="flex gap-3 items-center" htmlFor=""><span className="w-[4em] inline-block font-medium">Nombre:</span> <input type="text" name="nombre" onChange={valuesFields} value={user.nombre} className="bg-gray-200 border-0 outline-0 p-1.5 rounded-[7px] w-full" id="" placeholder="Your Name" /> </label>
          <label className="flex gap-3 items-center" htmlFor=""><span className="w-[4em] inline-block font-medium">Edad:</span> <input type="number" name="edad" onChange={valuesFields} value={user.edad} className="bg-gray-200 border-0 outline-0 p-1.5 rounded-[7px] w-full" id="" placeholder="Your Age" /> </label>
          <label className="flex gap-3 items-center" htmlFor=""><span className="w-[4em] inline-block font-medium">Pais:</span> <input type="text" name="pais" onChange={valuesFields} value={user.pais} className="bg-gray-200 border-0 outline-0 p-1.5 rounded-[7px] w-full" id="" placeholder="Your Country" /> </label>
          <label className="flex gap-3 items-center" htmlFor=""><span className="w-[4em] inline-block font-medium">Cargo:</span> <input type="text" name="cargo" onChange={valuesFields} value={user.cargo} className="bg-gray-200 border-0 outline-0 p-1.5 rounded-[7px] w-full" id="" placeholder="Your Ocupation" /> </label>
          <label className="flex gap-3 items-center" htmlFor=""><span className="w-[4em] inline-block font-medium">Años:</span> <input type="number" name="anios" onChange={valuesFields} value={user.anios} className="bg-gray-200 border-0 outline-0 p-1.5 rounded-[7px] w-full" id="" placeholder="Your Work experiences" /> </label>
          {
            editar ? <div className="flex gap-2 items-center justify-center w-fit m-auto">
              <button type="button" onClick={update} className="px-8 flex items-center py-2 bg-green-700 font-semibold text-white rounded-[10px] m-auto hover:cursor-pointer hover:bg-green-900 transition ease-in">Update <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg></button>
              <button type="button" onClick={calncelEdit} className="px-8 flex items-center py-2 bg-yellow-500 font-semibold text-white rounded-[10px] m-auto hover:cursor-pointer hover:bg-yellow-700 transition ease-in">Cancel <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-cancel"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M18.364 5.636l-12.728 12.728" /></svg></button>
            </div>
              :
              <button type="button" onClick={add} className="px-8 flex items-center py-2 bg-blue-600 font-semibold text-white rounded-[10px] m-auto hover:cursor-pointer hover:bg-blue-900 transition ease-in">Registrar <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-device-floppy"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2" /><path d="M12 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M14 4l0 4l-6 0l0 -4" /></svg></button>
          }
          {
            !empty && (
              <span className="relative text-center text-red-500 border-l-4 border-red-500 bg-red-100 rounded px-3 py-1 w-fit m-auto"> Todos los campos son obligatorios </span>
            )
          }
        </div>
        <br />
        <div className="w-full">
          <div class="relative overflow-x-auto  rounded-2xl">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    n°
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Nombre
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Edad
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Pais
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Cargo
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Años
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {getAllList}
              </tbody>
            </table>
            {!list.length > 0 && "Cargando..."}
          </div>

        </div>
      </div>
    </>
  )
}

export default App