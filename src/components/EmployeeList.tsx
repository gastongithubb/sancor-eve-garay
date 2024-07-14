import React, { useState, useEffect } from 'react';
import { 
  getEmployees, 
  updateEmployeeXLite, 
  getBreakSchedules, 
  updateBreakSchedule, 
  type EmployeeRow, 
  type BreakScheduleRow
} from './lib/db/db-users';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from './lib/ui/table';
import { Loader2 } from 'lucide-react';

const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;

const EmployeeList: React.FC = () => {
  const [employees, setEmployees] = useState<EmployeeRow[]>([]);
  const [breakSchedules, setBreakSchedules] = useState<Record<number, BreakScheduleRow[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [unsavedEmployeeChanges, setUnsavedEmployeeChanges] = useState<Record<number, string>>({});
  const [unsavedBreakChanges, setUnsavedBreakChanges] = useState<Omit<BreakScheduleRow, 'id' | 'endTime'>[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const employeesData = await getEmployees();
        setEmployees(employeesData);

        const breakSchedulesData: Record<number, BreakScheduleRow[]> = {};
        for (const employee of employeesData) {
          breakSchedulesData[employee.id] = await getBreakSchedules(employee.id, currentMonth, currentYear);
        }
        setBreakSchedules(breakSchedulesData);
      } catch (error: unknown) {
        console.error('Error fetching data:', error);
        setError(`Error al cargar los datos: ${error instanceof Error ? error.message : String(error)}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleXLiteChange = (id: number, xLite: string) => {
    setUnsavedEmployeeChanges(prev => ({...prev, [id]: xLite}));
  };

  const handleBreakScheduleChange = (employeeId: number, day: string, week: number, startTime: string) => {
    const newSchedule: Omit<BreakScheduleRow, 'id' | 'endTime'> = {
      employeeId,
      day,
      week,
      month: currentMonth,
      year: currentYear,
      startTime
    };
    setUnsavedBreakChanges(prev => [...prev.filter(s => 
      s.employeeId !== employeeId || s.day !== day || s.week !== week || s.month !== currentMonth || s.year !== currentYear
    ), newSchedule]);
  };

  const saveEmployeeChanges = async () => {
    try {
      for (const [id, xLite] of Object.entries(unsavedEmployeeChanges)) {
        await updateEmployeeXLite(Number(id), xLite);
      }
      setEmployees(employees.map(emp => 
        unsavedEmployeeChanges[emp.id] ? {...emp, xLite: unsavedEmployeeChanges[emp.id]} : emp
      ));
      setUnsavedEmployeeChanges({});
      alert('Cambios en empleados guardados exitosamente');
    } catch (error: unknown) {
      console.error('Error saving employee changes:', error);
      alert(`Error al guardar los cambios en empleados: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  const saveBreakChanges = async () => {
    try {
      for (const schedule of unsavedBreakChanges) {
        console.log('Intentando guardar horario:', schedule);
        await updateBreakSchedule({ ...schedule, endTime: '' }); // Pasamos un string vacío como endTime
        console.log('Horario guardado exitosamente:', schedule);
      }
      
      const updatedBreakSchedules = { ...breakSchedules };
      for (const schedule of unsavedBreakChanges) {
        if (!updatedBreakSchedules[schedule.employeeId]) {
          updatedBreakSchedules[schedule.employeeId] = [];
        }
        const index = updatedBreakSchedules[schedule.employeeId].findIndex(s => 
          s.day === schedule.day && s.week === schedule.week && s.month === schedule.month && s.year === schedule.year
        );
        if (index !== -1) {
          updatedBreakSchedules[schedule.employeeId][index] = { 
            ...updatedBreakSchedules[schedule.employeeId][index], 
            ...schedule, 
            endTime: '' // Mantenemos endTime como string vacío
          };
        } else {
          updatedBreakSchedules[schedule.employeeId].push({ id: 0, ...schedule, endTime: '' });
        }
      }
      setBreakSchedules(updatedBreakSchedules);
      setUnsavedBreakChanges([]);
      alert('Cambios en horarios de break guardados exitosamente');
    } catch (error: unknown) {
      console.error('Error detallado al guardar cambios de break:', error);
      alert(`Error al guardar los cambios en horarios de break: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  const filteredEmployees = employees.filter(employee =>
    `${employee.firstName} ${employee.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
      <p className="mt-4 text-lg font-semibold text-gray-700">Cargando programacion semanal.</p>
    </div>
  );

  if (error) return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p className="text-lg font-semibold text-red-600">{error}</p>
    </div>
  );

  return (
    <div className="container p-4 mx-auto">
      <h2 className="mb-4 text-2xl font-bold">Programacion Semanal</h2>
      {employees.length === 0 ? (
        <p>No hay empleados para mostrar.</p>
      ) : (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Apellido y Nombre</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>DNI</TableHead>
                <TableHead>Ingreso</TableHead>
                <TableHead>Egreso</TableHead>
                <TableHead>Hs. Trabajo</TableHead>
                <TableHead>X LITE</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>{employee.lastName} {employee.firstName}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>{employee.dni}</TableCell>
                  <TableCell>{employee.entryTime}</TableCell>
                  <TableCell>{employee.exitTime}</TableCell>
                  <TableCell>{employee.hoursWorked}</TableCell>
                  <TableCell>
                    <input 
                      type="text" 
                      value={unsavedEmployeeChanges[employee.id] || employee.xLite || ''} 
                      onChange={(e) => handleXLiteChange(employee.id, e.target.value)}
                      className="px-2 py-1 border rounded"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <button 
            onClick={saveEmployeeChanges}
            className="px-4 py-2 mt-4 font-bold text-white rounded bg-[#000] hover:bg-black"
            disabled={Object.keys(unsavedEmployeeChanges).length === 0}
          >
            Guardar Cambios en Empleados
          </button>
        </>
      )}

      <h3 className="mt-8 mb-4 text-xl font-bold">Horarios de Break</h3>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar empleado..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-2 py-1 border rounded"
        />
      </div>
      {filteredEmployees.map((employee) => (
        <div key={employee.id} className="mb-8">
          <h4 className="mb-2 text-lg font-semibold">{employee.firstName} {employee.lastName}</h4>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Día</TableHead>
                <TableHead>Semana 1</TableHead>
                <TableHead>Semana 2</TableHead>
                <TableHead>Semana 3</TableHead>
                <TableHead>Semana 4</TableHead>
                <TableHead>Semana 5</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {days.map((day) => (
                <TableRow key={day}>
                  <TableCell>{day}</TableCell>
                  {[1, 2, 3, 4, 5].map((week) => {
                    const schedule = unsavedBreakChanges.find(s => 
                      s.employeeId === employee.id && s.day === day && s.week === week && s.month === currentMonth && s.year === currentYear
                    ) || breakSchedules[employee.id]?.find(s => 
                      s.day === day && s.week === week && s.month === currentMonth && s.year === currentYear
                    ) || { startTime: '' };
                    return (
                      <TableCell key={week}>
                        <input 
                          type="time" 
                          value={schedule.startTime} 
                          onChange={(e) => handleBreakScheduleChange(employee.id, day, week, e.target.value)}
                          className="px-2 py-1 border rounded"
                        />
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ))}
      <button 
        onClick={saveBreakChanges}
        className="px-4 py-2 mt-4 font-bold text-white rounded bg-[#000] hover:bg-black"
        disabled={unsavedBreakChanges.length === 0}
      >
        Guardar Cambios en Horarios de Break
      </button>
    </div>
  );
};

export default EmployeeList;