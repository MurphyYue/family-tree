import { useState } from 'react'

function RelationshipFinder({ familyMembers }) {
  const [person1, setPerson1] = useState('')
  const [person2, setPerson2] = useState('')
  const [relationship, setRelationship] = useState('')

  const findRelationship = () => {
    if (!person1 || !person2) {
      setRelationship('Please select both people')
      return
    }

    if (person1 === person2) {
      setRelationship('Same person selected')
      return
    }

    const member1 = familyMembers.find(m => m.id === parseInt(person1))
    const member2 = familyMembers.find(m => m.id === parseInt(person2))

    // Check if direct parent-child relationship
    if (member2.parentId === member1.id) {
      setRelationship(`${member1.name} is the parent of ${member2.name}`)
      return
    }

    if (member1.parentId === member2.id) {
      setRelationship(`${member2.name} is the parent of ${member1.name}`)
      return
    }

    // Check if siblings (same parent)
    if (member1.parentId && member2.parentId && member1.parentId === member2.parentId) {
      setRelationship(`${member1.name} and ${member2.name} are siblings`)
      return
    }

    // Check if grandparent relationship
    const parent1 = familyMembers.find(m => m.id === member1.parentId)
    const parent2 = familyMembers.find(m => m.id === member2.parentId)

    if (parent1 && parent1.parentId === member2.id) {
      setRelationship(`${member2.name} is the grandparent of ${member1.name}`)
      return
    }

    if (parent2 && parent2.parentId === member1.id) {
      setRelationship(`${member1.name} is the grandparent of ${member2.name}`)
      return
    }

    // If no specific relationship found
    setRelationship('Relationship could not be determined')
  }

  return (
    <div className="relationship-finder">
      <h2>Find Relationship</h2>
      <div className="relationship-form">
        <div className="form-group">
          <label>Person 1:</label>
          <select 
            value={person1} 
            onChange={(e) => setPerson1(e.target.value)}
          >
            <option value="">Select a person</option>
            {familyMembers.map(member => (
              <option key={member.id} value={member.id}>
                {member.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Person 2:</label>
          <select 
            value={person2} 
            onChange={(e) => setPerson2(e.target.value)}
          >
            <option value="">Select a person</option>
            {familyMembers.map(member => (
              <option key={member.id} value={member.id}>
                {member.name}
              </option>
            ))}
          </select>
        </div>

        <button onClick={findRelationship}>Find Relationship</button>
      </div>

      {relationship && (
        <div className="relationship-result">
          <p>{relationship}</p>
        </div>
      )}
    </div>
  )
}

export default RelationshipFinder