import React, { useState, useEffect } from 'react';

const API_BASE = 'http://localhost:4005/management';
export default function Add() {
    const [items, setItems] = useState([]);
    const [selectedContribution, setSelectedContribution] = useState('');
    const [contributionPts, setContributionPts] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [mentorName, setMentorName] = useState('');
    const [societyName, setSocietyName] = useState('');
    const [contributionNote, setContributionNote] = useState('');

    useEffect(() => {
        getItems();
    }, []);

    const getItems = () => {
        fetch(API_BASE)
            .then(res => res.json())
            .then(data => setItems(data))
            .catch(err => console.log(err))
    }

    const handleContributionChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedContribution(selectedValue);

        fetch(`http://localhost:4005/management/${selectedValue}`)
            .then(res => res.json())
            .then(data => setContributionPts(data.Points))
            .catch(err => console.log(err));
    };

    const handleCategoryChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedCategory(selectedValue);
    };

    const handleSubmit = (event) => {
      event.preventDefault();
  
      const formData = {
          Contributions: selectedContribution,
          Points: contributionPts,
          Society: societyName,
          Mentor: mentorName,
          Status: "Not Active",
          Note: contributionNote
      };
  
      fetch('http://localhost:4006/society', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
      })
      .then(response => {
          if (response.ok) {
              console.log('Contribution submitted successfully!');
            
              setSelectedContribution('');
              setContributionPts(0);
              setSelectedCategory('');
              setMentorName('');
              setSocietyName('');
              setContributionNote('');
          } else {
              console.error('Failed to submit contribution.');
          }
      })
      .catch(error => {
          console.error('Error:', error);
      });
  };
  

    return (
        <div>
            <div>
                <select onChange={handleContributionChange}>
                    <option value="">Select Contribution</option>
                    {items.map(item => (
                        <option key={item.id} value={item.id}>
                            {item.Contributions}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Contribution Points:</label>
                <input type="text" readOnly value={contributionPts} />
            </div>
            <div>
                <label htmlFor="category">Categories:</label>
                <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
                    <option value="">Select Category</option>
                    <option value="E-Gaming">E-Gaming</option>
                    <option value="Literature">Literature</option>
                    <option value="Sports">Sports</option>
                    <option value="Creative">Creative</option>
                    <option value="Technical">Technical</option>
                </select>
            </div>
            <div>
                <label htmlFor="mentorName">Mentor Name:</label>
                <input type="text" id="mentorName" value={mentorName} onChange={(event) => setMentorName(event.target.value)} />
            </div>
            <div>
                <label htmlFor="societyName">Society Name:</label>
                <input type="text" id="societyName" value={societyName} onChange={(event) => setSocietyName(event.target.value)} />
            </div>
            <div>
                <label htmlFor="contributionNote">Contribution Note:</label>
                <textarea id="contributionNote" value={contributionNote} onChange={(event) => setContributionNote(event.target.value)} />
            </div>
            <button type="submit" onClick={handleSubmit}>Submit</button>
        </div>
    )
}
